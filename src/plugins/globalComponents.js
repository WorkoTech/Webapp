import Badge from "../components/Theme/Badge";
import BaseAlert from "../components/Theme/BaseAlert";
import BaseButton from "../components/Theme/BaseButton";
import BaseCheckbox from "../components/Theme/BaseCheckbox";
import BaseInput from "../components/Theme/BaseInput";
import BaseDropdown from "../components/Theme/BaseDropdown";
import BaseNav from "../components/Theme/BaseNav";
import BasePagination from "../components/Theme/BasePagination";
import BaseProgress from "../components/Theme/BaseProgress";
import BaseRadio from "../components/Theme/BaseRadio";
import BaseSlider from "../components/Theme/BaseSlider";
import BaseSwitch from "../components/Theme/BaseSwitch";
import BaseTable from "../components/Theme/BaseTable";
import BaseHeader from "../components/Theme/BaseHeader";
import Card from "../components/Theme/Card";
import StatsCard from "../components/Theme/StatsCard";
import Modal from "../components/Theme/Modal";
import TabPane from "../components/Tabs/TabPane";
import Tabs from "../components/Tabs/Tabs";

export default {
  install(Vue) {
    Vue.component(Badge.name, Badge);
    Vue.component(BaseAlert.name, BaseAlert);
    Vue.component(BaseButton.name, BaseButton);
    Vue.component(BaseInput.name, BaseInput);
    Vue.component(BaseNav.name, BaseNav);
    Vue.component(BaseDropdown.name, BaseDropdown);
    Vue.component(BaseCheckbox.name, BaseCheckbox);
    Vue.component(BasePagination.name, BasePagination);
    Vue.component(BaseProgress.name, BaseProgress);
    Vue.component(BaseRadio.name, BaseRadio);
    Vue.component(BaseSlider.name, BaseSlider);
    Vue.component(BaseSwitch.name, BaseSwitch);
    Vue.component(BaseTable.name, BaseTable);
    Vue.component(BaseHeader.name, BaseHeader);
    Vue.component(Card.name, Card);
    Vue.component(StatsCard.name, StatsCard);
    Vue.component(Modal.name, Modal);
    Vue.component(TabPane.name, TabPane);
    Vue.component(Tabs.name, Tabs);
  }
};
