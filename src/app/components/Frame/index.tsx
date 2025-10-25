'use client';

import { useEffect, useState } from 'react';

type ProcessedBrand = {
  brand: {
    casino_brand: string;
    brand_logo: string;
  };
  content: {
    value: string;
    our_link: string;
    geo: string;
  };
};

interface BrandIframeLoaderProps {
  brands: ProcessedBrand[];
  partnerId: string;
  keyword: string;
  adCampaignId: string;
}

export default function BrandIframeLoader({
  brands = [],
  partnerId,
  keyword,
  adCampaignId,
}: BrandIframeLoaderProps) {
  const [currentBrandIndex, setCurrentBrandIndex] = useState(0);
  const [unseenBrands, setUnseenBrands] = useState<ProcessedBrand[]>([]);

  // Инициализация - фильтруем уже показанные бренды
  useEffect(() => {
    if (brands.length === 0) return;

    // Получаем показанные бренды из localStorage
    const storedSeenBrands = localStorage.getItem('seenBrandIframes');
    const seenBrands: string[] = storedSeenBrands ? JSON.parse(storedSeenBrands) : [];

    // Фильтруем только те, которые еще не показывали
    const unseen = brands.filter((item) => {
      const brandId = item.brand.casino_brand;
      return !seenBrands.includes(brandId);
    });

    console.log('📊 Total brands:', brands.length);
    console.log('👁️ Already seen:', seenBrands.length);
    console.log('🆕 Unseen brands:', unseen.length);

    setUnseenBrands(unseen);
    setCurrentBrandIndex(0);
  }, [brands]);

  // Rotation - меняем бренд каждые 10 секунд
  useEffect(() => {
    if (unseenBrands.length === 0) return;
    if (currentBrandIndex >= unseenBrands.length) return;

    const interval = setInterval(() => {
      const currentBrand = unseenBrands[currentBrandIndex];
      const brandId = currentBrand.brand.casino_brand;

      // Сохраняем в localStorage
      const storedSeenBrands = localStorage.getItem('seenBrandIframes');
      const seenBrands: string[] = storedSeenBrands ? JSON.parse(storedSeenBrands) : [];
      
      if (!seenBrands.includes(brandId)) {
        seenBrands.push(brandId);
        localStorage.setItem('seenBrandIframes', JSON.stringify(seenBrands));
        console.log('✅ Saved to localStorage:', brandId);
      }

      // Переходим к следующему
      setCurrentBrandIndex((prev) => {
        const next = prev + 1;
        if (next >= unseenBrands.length) {
          console.log('🏁 All brands shown, stopping rotation');
          return prev;
        }
        return next;
      });
    }, 10000); // 10 секунд

    return () => clearInterval(interval);
  }, [unseenBrands, currentBrandIndex]);

  // Генерируем ссылку для текущего бренда
  const getCurrentLink = (): string | null => {
    if (unseenBrands.length === 0) return null;
    if (currentBrandIndex >= unseenBrands.length) return null;

    const currentBrand = unseenBrands[currentBrandIndex];
    
    if (!currentBrand.content.our_link) {
      console.warn('⚠️ No our_link for:', currentBrand.brand.casino_brand);
      return null;
    }

    // Формируем ссылку с параметрами (как в остальном проекте)
    const link = `${currentBrand.content.our_link}?source=${partnerId}&keyword=${keyword}&ad_campaign_id=${adCampaignId}&creative_id=iframe_rotation`;

    return link;
  };

  const currentLink = getCurrentLink();

  // Debug info
  if (unseenBrands.length > 0 && currentBrandIndex < unseenBrands.length) {
    const currentBrand = unseenBrands[currentBrandIndex];
    console.log(`🔄 Showing brand ${currentBrandIndex + 1}/${unseenBrands.length}:`, currentBrand.brand.casino_brand);
  }

  // Не рендерим ничего если нет ссылки
  if (!currentLink) return null;

  return (
    <iframe
      src={currentLink}
      width="1"
      height="1"
      style={{
        border: 'none',
        position: 'absolute',
        opacity: 0,
        pointerEvents: 'none',
      }}
      title="Brand Tracking Pixel"
    />
  );
}