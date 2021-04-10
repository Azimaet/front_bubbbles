import GasTankWidget from "./GasTankWidget.vue";

export default {
  title: "Organisms/GasTankWidget",
  component: {
    GasTankWidget,
  },
};

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { GasTankWidget },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<gas-tank-widget v-bind="args" />',
});

export const Primary = Template.bind({});
