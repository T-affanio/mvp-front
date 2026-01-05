import { DeliveryService } from "@/admin/services/delivery.service";
import { DeliveryArea } from "@/admin/types/Delivery";
import { useEffect, useState } from "react";


export function useDeliveryAreas() {
  const [areas, setAreas] = useState<DeliveryArea[]>([]);

  async function load() {
    setAreas(await DeliveryService.list());
  }

  useEffect(() => {
    load();
  }, []);

  return { areas, reload: load };
}
