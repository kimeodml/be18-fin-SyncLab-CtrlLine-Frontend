import { useQuery } from '@tanstack/vue-query';
import { reactive, computed } from 'vue';

import { getProductionPlanAll } from '@/apis/query-functions/productionPlan';

export default function useGetProductionPlanAll(initialFilters, enabledRef) {
  const filters = reactive({ ...initialFilters });

  // enabledRef가 없으면 기본값은 "필터에 뭔가 값이 있을 때만" 으로
  const queryEnabled = computed(() => {
    if (enabledRef) return enabledRef.value;

    return Object.values(filters).some(v => v !== null && v !== '');
  });

  const query = useQuery({
    queryKey: ['productionPlanAll', filters],
    queryFn: () => getProductionPlanAll({ ...filters }),
    enabled: queryEnabled,
  });

  return {
    ...query,
    filters,
  };
}
