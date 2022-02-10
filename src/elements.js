import Vue from "vue";
import { MessageBox, Message, Pagination } from "element-ui";

Vue.component(Pagination.name, Pagination);

Vue.prototype.$MessageBox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$message = Message;
