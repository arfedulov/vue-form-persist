# vue-form-persist

This package provides a mixin which adds persist functionality to
vue forms. The mixin exposes `persist()` method which you can call
in order to persist the component's data. The method is 1 second debounced
by default.

An example of basic usage:

```html
<input v-model="username" type="text" name="username" @input="persist" />
```

```js
import { persistorMixin } from "@arfedulov/vue-form-persist";

export default {
  name: "DemoForm",
  mixins: [persistorMixin(["username"])], // specify field names that going to be persisted
  data() {
    return {
      username: "", // is persisted
      someOtherField: "" // is not persisted
    };
  }
};
```

There are three possibilities of how to provide a persistence key:

* provide an attribute `persist-id`
* provide a `persistKey` option to persistorMixin
* rely on default behaviour (component's `name` is used as a persistence key)

The key is chosen in the following priority: attribute, option, default.

An example of using more than one instances of the same component
using `persist-id` attribute:

```html
<demo-form persist-id="form1" />
<demo-form persist-id="form2" />
```

An example of using `persistorMixin` with options:

```js
export default {
    // ...
    mixins: [
        persistorMixin(["username", "email", "address"], {
            persistKey: "my-persist-id",
            debounceTime: 500 // ms
        })
    ],
    // ...
}
```