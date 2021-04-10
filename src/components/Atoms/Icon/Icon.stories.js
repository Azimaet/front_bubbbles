import Icon from "./Icon.vue";

export default {
  title: "Atoms/Icon",
  component: Icon,
};

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { Icon },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<icon-base v-bind="args" />',
});

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: "Icon",
};
