export type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export type PageProps = {
  params: { locale: string };
};
