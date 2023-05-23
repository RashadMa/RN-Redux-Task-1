import axios from "axios";
import { useEffect, useState } from "react";

export const useProductDetail = (id: number) => {

      const [detail, setdetail] = useState<any>({});
      const [loading, setloading] = useState(true);

      useEffect(() => {

            async function getProductById() {
                  const res = await axios.get("https://northwind.vercel.app/api/products/" + id);
                  setdetail(res.data);
                  setloading(false);
            }

            getProductById();

      }, [id])

      return { loading, detail, setdetail }
}