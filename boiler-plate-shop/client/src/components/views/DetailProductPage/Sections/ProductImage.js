import React, { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";

// 상품 업로드 페이지에서 썸네일을 생성하지 않았지만, 생성하는 방법은 gm 라이브러리를 사용해서 생성할 수 있다.
function ProductImage(props) {
  const [Images, setImages] = useState([]);

  useEffect(() => {
    console.log("ProductImage... props.detail.images: ", props.detail.images);
    if (props.detail.images && props.detail.images.length > 0) {
      const images = [];

      props.detail.images.map((item) => {
        images.push({
          original: `http://localhost:3010/${item}`,
          thumbnail: `http://localhost:3010/${item}`,
        });
      });

      console.log("images: ", images);

      setImages(images);
    }
    // DetailProductPage에서 서버로 요청한 Product 값을 받아 state에 설정되었을 때, 다시 렌더링을 해줘야한다.
    // 처음에는 detail이 비어있는 상태고 state.detail의 값이 변경 될 때마다 useEffect를 다시 호출한다는 의미이다.
  }, [props.detail]);

  return Images?.length > 0 && <ImageGallery items={Images} />;
}

export default ProductImage;
