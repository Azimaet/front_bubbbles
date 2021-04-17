import GasTankHandler from "./GasTankHandler.vue";
import reset from "./../../../assets/css/reset.css";

export default {
  title: "Organisms/GasTankHandler",
  component: {
    GasTankHandler,
    reset,
  },
};

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { GasTankHandler },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<gas-tank-handler v-bind="args" />',
});

export const Primary = Template.bind({});
