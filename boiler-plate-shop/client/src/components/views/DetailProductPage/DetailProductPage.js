import React, { useEffect } from "react";
import axios from "axios";

function DetailProductPage(props) {
  const productId = props.match.params.productId;
  useEffect(() => {
    axios
      .get(`/api/product/products_by_id?id=${productId}&type=single`)
      .then((response) => {
        console.log("response.data: ", response.data);
      })
      .catch((err) => alert(err));
  }, []);

  return <div>DetailProductPage</div>;
}

export default DetailProductPage;
