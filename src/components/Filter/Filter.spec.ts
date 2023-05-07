import { mount } from "@vue/test-utils";
import Filter from "./Filter.vue";
import languages from "../../assets/languages.json";

describe("A Filter component", () => {
  const mountFilter = () => mount(Filter);

  it("should display a list of languages options", () => {
    const wrapper = mountFilter();

    const options = wrapper.findAll("option");

    options.forEach((option, index) =>
      expect(option.text()).toBe(languages[index].name)
    );
  });

  it("should emmit changeLanguage event whith the English if we changed the language to that", async () => {
    const wrapper = mountFilter();

    const select = wrapper.find("select");
    await select.setValue("English");

    expect(wrapper.emitted("changeLanguage")![0][0]).toBe("English");
  });
});
