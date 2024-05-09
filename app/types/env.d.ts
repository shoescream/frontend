namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_BASE_URL: string;
    NEXT_PUBLIC_KAKAO_REST_API_KEY: string;
    NEXT_PUBLIC_KAKAO_RETURN_URL: string;
    NEXT_PUBLIC_KAKAO_CLIENT_SECRET: string;
  }
}

interface Window {
  Kakao: any;
}
