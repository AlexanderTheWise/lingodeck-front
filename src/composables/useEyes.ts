import { onMounted, watch } from "vue";
import Lottie, { type AnimationItem } from "lottie-web";
import animationData from "../assets/lottie/eyes.json";
import useUiStore from "@/store/ui/uiStore";

export default function useEyes() {
  const uiStore = useUiStore();

  onMounted(async () => {
    const animationItems: AnimationItem[] = Array.from(
      document.querySelectorAll(".eye")
    ).map((element) => {
      return Lottie.loadAnimation({
        container: element,
        animationData,
        loop: false,
        initialSegment: [1, 20],
      });
    });

    watch(uiStore.ui, ({ openEyes }) => {
      if (openEyes) {
        animationItems.forEach((item) => item.playSegments([1, 20], true));
      } else {
        animationItems.forEach((item) => item.playSegments([20, 1], true));
      }
    });
  });
}
