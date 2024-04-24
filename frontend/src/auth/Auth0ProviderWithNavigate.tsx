import { Auth0Provider } from "@auth0/auth0-react";

type Auth0ProviderWithNavigateProps = {
  children: React.ReactNode;
};

const Auth0ProviderWithNavigate = ({
  children,
}: Auth0ProviderWithNavigateProps) => {
  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL;

  if (!domain || !clientId || !redirectUri) {
    throw new Error("unable to initialize auth");
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{ redirect_uri: redirectUri }}
      useRefreshTokens
      cacheLocation="localstorage"
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithNavigate;
