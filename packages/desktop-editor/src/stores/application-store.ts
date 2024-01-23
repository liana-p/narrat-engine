import { defineStore, acceptHMRUpdate } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";
export const useApplication = defineStore("application-store", () => {
  const isLoading = ref(false);
  const router = useRouter();
  function startLoading(nextRoute?: string) {
    isLoading.value = true;
    router.push("/loading");
    return () => {
      endLoading(nextRoute);
    };
  }
  function endLoading(nextRoute?: string) {
    isLoading.value = false;
    if (nextRoute) {
      router.replace(nextRoute);
    }
  }
  function fullReload() {
    window.location.replace("/");
  }
  return {
    isLoading,
    startLoading,
    endLoading,
    fullReload,
  };
});
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useApplication, import.meta.hot));
}
