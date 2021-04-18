import GasTankHandler from "./GasTankHandler.vue";
import reset from "./../../../assets/css/reset.css";
import colors from "./../../../assets/css/colors.css";

export default {
  title: "Molecules/GasTankHandler",
  component: {
    GasTankHandler,
    reset,
    colors,
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
