import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateSetting as updateSettingAPI } from "../../services/apiSettings";

function useUpdateSettings() {
  const queryClient = useQueryClient();

  const { mutate: updateSettings, isLoading: isUpdating } = useMutation({
    mutationFn: updateSettingAPI,
    onSuccess: () => {
      toast.success("Settings successfully updated ");
      queryClient.invalidateQueries(["settings"]);
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateSettings, isUpdating };
}

export default useUpdateSettings;
