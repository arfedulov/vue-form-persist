import debounce from "lodash.debounce";

const createPersistor = (ctx, persistKey, persistFields) => {
  const persistFn = () => {
    const formData = {};

    persistFields.forEach(fieldName => {
      formData[fieldName] = ctx[fieldName];
    });

    localStorage.setItem(persistKey, JSON.stringify(formData));
  };

  const restoreFn = () => {
    const data = localStorage.getItem(persistKey);

    if (!data) {
      return;
    }

    let parsed;

    try {
      parsed = JSON.parse(data);
    } catch (error) {
      console.error(error);

      return;
    }

    persistFields.forEach(fieldName => {
      ctx[fieldName] = parsed[fieldName];
    });
  };

  return { persistFn, restoreFn };
};

export const persistorMixin = (persistFields, options = {}) => ({
  created() {
    const persistKey =
      this.$attrs["persist-id"] || options.persistKey || this.$options.name;
    delete this.$attrs["persist-id"];

    if (!persistKey) {
      throw Error(
        'Invalid usage of "persistorMixin". Missing "persistKey" option'
      );
    }

    const persistor = createPersistor(this, persistKey, persistFields);

    this.persist = debounce(persistor.persistFn, options.debounceTime || 1000);

    persistor.restoreFn();
  },
  methods: {
    persist() {
      throw Error("Not implemented");
    }
  }
});
