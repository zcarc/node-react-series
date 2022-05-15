import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Icon, Col, Row } from "antd";
import Meta from "antd/lib/card/Meta";
import ImageSlider from "../../utils/ImageSlider";

function LandingPage() {
  const [Products, setProducts] = useState([]);
  const [Skip, setSkip] = useState(0);
  const [Limit, setLimit] = useState(8);

  useEffect(() => {
    const body = {
      skip: Skip,
      limit: Limit,
    };

    axios.post("/api/product/products", body).then((response) => {
      if (response.data.success) {
        setProducts(response.data.productInfo);
      } else {
        alert(" 상품들을 가져오는데 실패 했습니다.");
      }
    });
  }, []);

  const loadMoreHanlder = () => {};

  const renderCards = Products.map((product, index) => {
    return (
      <Col lg={6} md={8} xs={24} key={index}>
        <Card cover={<ImageSlider images={product.images} />}>
          <Meta title={product.title} description={`$${product.price}`} />
        </Card>
      </Col>
    );
  });

  return (
    <div style={{ width: "75%", margin: "3rem auto" }}>
      <div style={{ textAlign: "center" }}>
        <h2>
          Let's Travel Anywhere <Icon type="rocket" />
        </h2>
      </div>

      {/* Filter */}

      {/* RadioBox */}

      {/* Search */}

      {/* Cards */}

      <Row gutter={[16, 16]}>{renderCards}</Row>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <button onClick={loadMoreHanlder}>더보기</button>
      </div>
    </div>
  );
}

export default LandingPage;
