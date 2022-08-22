import {
  Button,
  ButtonGroup,
  Select,
  Table,
  TableColumn,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Descriptions,
  DescriptionsItem,
  Pagination,
  MessageBox,
  Message,
  Popover,
  Dialog,
  Input,
  Cascader,
  Option,
  Radio,
  Slider,
  TimePicker,
  DatePicker,
  TimeSelect,
  Checkbox,
  CheckboxGroup,
  CheckboxButton,
  Menu,
  MenuItem,
  Submenu,
  Form,
  FormItem,
  Image,
  Divider
} from "element-ui";

export default {
  install: function(Vue) {
    Vue.component(Button.name, Button);
    Vue.component(ButtonGroup.name, ButtonGroup);
    Vue.component(Select.name, Select);
    Vue.component(Table.name, Table);
    Vue.component(TableColumn.name, TableColumn);
    Vue.component(Dropdown.name, Dropdown);
    Vue.component(DropdownMenu.name, DropdownMenu);
    Vue.component(DropdownItem.name, DropdownItem);
    Vue.component(Descriptions.name, Descriptions);
    Vue.component(DescriptionsItem.name, DescriptionsItem);
    Vue.component(Pagination.name, Pagination);
    Vue.component(Popover.name, Popover);
    Vue.component(Dialog.name, Dialog);
    Vue.component(Input.name, Input);
    Vue.component(Cascader.name, Cascader);
    Vue.component(Option.name, Option);
    Vue.component(Radio.name, Radio);
    Vue.component(Slider.name, Slider);
    Vue.component(DatePicker.name, DatePicker);
    Vue.component(TimePicker.name, TimePicker);
    Vue.component(TimeSelect.name, TimeSelect);
    Vue.component(CheckboxGroup.name, CheckboxGroup);
    Vue.component(CheckboxButton.name, CheckboxButton);
    Vue.component(Checkbox.name, Checkbox);
    Vue.component(Menu.name, Menu);
    Vue.component(MenuItem.name, MenuItem);
    Vue.component(Submenu.name, Submenu);
    Vue.component(Form.name, Form);
    Vue.component(FormItem.name, FormItem);
    Vue.component(Image.name, Image);
    Vue.component(Divider.name, Divider);
    Vue.prototype.$msgbox = MessageBox;
    Vue.prototype.$alert = MessageBox.alert;
    Vue.prototype.$confirm = MessageBox.confirm;
    Vue.prototype.$prompt = MessageBox.prompt;
    Vue.prototype.$message = Message;
  },
};
