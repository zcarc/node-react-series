import React, { useEffect, useState } from "react";
import axios from "axios";
import { Col, Row } from "antd";
import ProductImage from "./Sections/ProductImage";
import ProductInfo from "./Sections/ProductInfo";

function DetailProductPage(props) {
  const productId = props.match.params.productId;
  const [Product, setProduct] = useState({});
  useEffect(() => {
    axios
      .get(`/api/product/products_by_id?id=${productId}&type=single`)
      .then((response) => {
        console.log("response.data: ", response.data);
        setProduct(response.data.product[0]);
      })
      .catch((err) => alert(err));
  }, []);

  return (
    <div style={{ width: "100%", padding: "3rem 4rem" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1>{Product.title}</h1>
      </div>

      <br />

      <Row gutter={[16, 16]}>
        {/* ProductImage */}
        <Col lg={12} sm={24}>
          <ProductImage detail={Product} />
        </Col>
        {/* ProductInfo */}
        <Col lg={12} sm={24}>
          <ProductInfo detail={Product} />
        </Col>
      </Row>
    </div>
  );
}

export default DetailProductPage;
