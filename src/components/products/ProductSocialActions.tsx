
import React from 'react';
import { Button } from "@/components/ui/button";
import ProductShare from '@/components/social/ProductShare';
import FavoriteFarmerButton from '@/components/social/FavoriteFarmerButton';

type ProductSocialActionsProps = {
  productId: number;
  productName: string;
  productImage?: string;
  farmerId: number;
  farmerName: string;
  farmName: string;
  farmerAvatar?: string;
  farmerProductCount: number;
  farmerRating: number;
  layout?: 'horizontal' | 'vertical';
  className?: string;
};

const ProductSocialActions = ({
  productId,
  productName,
  productImage,
  farmerId,
  farmerName,
  farmName,
  farmerAvatar,
  farmerProductCount,
  farmerRating,
  layout = 'horizontal',
  className = '',
}: ProductSocialActionsProps) => {
  return (
    <div className={`${layout === 'horizontal' ? 'flex' : 'flex flex-col'} gap-3 ${className}`}>
      <ProductShare
        productId={productId}
        productName={productName}
        productImage={productImage}
        variant="button"
      />
      
      <FavoriteFarmerButton
        farmerId={farmerId}
        farmerName={farmerName}
        farmName={farmName}
        farmerAvatar={farmerAvatar}
        products={farmerProductCount}
        rating={farmerRating}
        variant="button"
      />
    </div>
  );
};

export default ProductSocialActions;
