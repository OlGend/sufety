'use client';

import { useEffect } from 'react';

const ALLOWED = ['partner1039', 'partner1043', 'partner1044', 'partner1045', 'partnerCLD'];

export function CookieWriter() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const partner = params.get('partner');
    const keyword = params.get('keyword');
    const adCampaignId = params.get('ad_campaign_id');
    
    const setCookie = (name: string, value: string) => {
      document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=2592000`;
    };
    
    if (partner && ALLOWED.includes(partner)) {
      setCookie('partnerId', partner);
      console.log('🍪 Saved partnerId:', partner);
    }
    
    if (keyword) {
      setCookie('rawKeyword', keyword);
      console.log('🍪 Saved keyword:', keyword);
    }
    
    if (adCampaignId) {
      setCookie('ad_campaign_id', adCampaignId);
      console.log('🍪 Saved ad_campaign_id:', adCampaignId);
    }
  }, []);
  
  return null;
}