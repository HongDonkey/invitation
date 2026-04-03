import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';
// import Script from "next/script";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "동기랑 지현이 결혼합니다.💕",
  description: "우리의 결혼식에 초대합니다. 방명록을 통해 축하 메시지를 남겨주세요.",
};

// export const metadata: Metadata = {
//   title: "talenX",
//   description: "talenX 공식 웹사이트입니다. 최신 기술 트렌드, 개발 팁, 그리고 다양한 프로그래밍 관련 콘텐츠를 제공합니다. 함께 성장하는 개발자 커뮤니티에 참여하세요!",
// };

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ko">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<AppRouterCacheProvider>
					<ThemeProvider theme={theme}>
						<Header></Header>
							<CssBaseline />
						{children}
						<script src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=1fc22a2fdc3bb0919ac9d97dbe578287&autoload=false&libraries=services"></script>
						{/* <Script 
							type="text/javascript"
							src="//dapi.kakao.com/v2/maps/sdk.js?appkey=555cf69427bbaafbbc740088a0973e04"/> */}
					</ThemeProvider>
					</AppRouterCacheProvider>
			</body>
		</html>
	);
}
