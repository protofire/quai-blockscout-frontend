// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file will be automatically regenerated when your Next.js server is running.
// nextjs-routes version: 1.0.8
/* eslint-disable */

// prettier-ignore
declare module "nextjs-routes" {
  import type {
    GetServerSidePropsContext as NextGetServerSidePropsContext,
    GetServerSidePropsResult as NextGetServerSidePropsResult
  } from "nextjs";

  export type Route =
    | StaticRoute<"/404">
    | StaticRoute<"/account/api-key">
    | StaticRoute<"/account/custom-abi">
    | StaticRoute<"/account/public-tags-request">
    | StaticRoute<"/account/tag-address">
    | StaticRoute<"/account/verified-addresses">
    | StaticRoute<"/account/watchlist">
    | StaticRoute<"/accounts">
    | DynamicRoute<"/address/[hash]/contract-verification", { "hash": string }>
    | DynamicRoute<"/address/[hash]", { "hash": string }>
    | StaticRoute<"/api/csrf">
    | StaticRoute<"/api/healthz">
    | StaticRoute<"/api/media-type">
    | StaticRoute<"/api/proxy">
    | StaticRoute<"/api-docs">
    | DynamicRoute<"/apps/[id]", { "id": string }>
    | StaticRoute<"/apps">
    | StaticRoute<"/auth/auth0">
    | StaticRoute<"/auth/profile">
    | StaticRoute<"/auth/unverified-email">
    | DynamicRoute<"/batches/[number]", { "number": string }>
    | StaticRoute<"/batches">
    | DynamicRoute<"/blobs/[hash]", { "hash": string }>
    | DynamicRoute<"/block/[height_or_hash]", { "height_or_hash": string }>
    | StaticRoute<"/blocks">
    | StaticRoute<"/contract-verification">
    | StaticRoute<"/csv-export">
    | StaticRoute<"/deposits">
    | StaticRoute<"/gas-tracker">
    | StaticRoute<"/graphiql">
    | StaticRoute<"/">
    | StaticRoute<"/login">
    | DynamicRoute<"/name-domains/[name]", { "name": string }>
    | StaticRoute<"/name-domains">
    | DynamicRoute<"/op/[hash]", { "hash": string }>
    | StaticRoute<"/ops">
    | StaticRoute<"/output-roots">
    | StaticRoute<"/search-results">
    | StaticRoute<"/stats">
    | DynamicRoute<"/token/[hash]", { "hash": string }>
    | DynamicRoute<"/token/[hash]/instance/[id]", { "hash": string; "id": string }>
    | StaticRoute<"/tokens">
    | DynamicRoute<"/tx/[hash]", { "hash": string }>
    | StaticRoute<"/txs">
    | DynamicRoute<"/txs/kettle/[hash]", { "hash": string }>
    | StaticRoute<"/validators">
    | StaticRoute<"/verified-contracts">
    | StaticRoute<"/visualize/sol2uml">
    | StaticRoute<"/withdrawals">;

  interface StaticRoute<Pathname> {
    pathname: Pathname;
    query?: Query | undefined;
    hash?: string | null | undefined;
  }

  interface DynamicRoute<Pathname, Parameters> {
    pathname: Pathname;
    query: Parameters & Query;
    hash?: string | null | undefined;
  }

  interface Query {
    [key: string]: string | string[] | undefined;
  };

  export type RoutedQuery<P extends Route["pathname"]> = Extract<
    Route,
    { pathname: P }
  >["query"];

  export type Locale = undefined;

  /**
   * A typesafe utility function for generating paths in your application.
   *
   * route({ pathname: "/foos/[foo]", query: { foo: "bar" }}) will produce "/foos/bar".
   */
  export declare function route(r: Route): string;

  /**
   * Nearly identical to GetServerSidePropsContext from next, but further narrows
   * types based on nextjs-route's route data.
   */
  export type GetServerSidePropsContext<
    Pathname extends Route["pathname"] = Route["pathname"],
    Preview extends NextGetServerSidePropsContext["previewData"] = NextGetServerSidePropsContext["previewData"]
  > = Omit<NextGetServerSidePropsContext, 'params' | 'query' | 'defaultLocale' | 'locale' | 'locales'> & {
    params: Extract<Route, { pathname: Pathname }>["query"];
    query: Query;
    defaultLocale?: undefined;
    locale?: Locale;
    locales?: undefined;
  };

  /**
   * Nearly identical to GetServerSideProps from next, but further narrows
   * types based on nextjs-route's route data.
   */
  export type GetServerSideProps<
    Props extends { [key: string]: any } = { [key: string]: any },
    Pathname extends Route["pathname"] = Route["pathname"],
    Preview extends NextGetServerSideProps["previewData"] = NextGetServerSideProps["previewData"]
  > = (
    context: GetServerSidePropsContext<Pathname, Preview>
  ) => Promise<NextGetServerSidePropsResult<Props>>
}

// prettier-ignore
declare module "next/link" {
  import type { Route } from "nextjs-routes";
  import type { LinkProps as NextLinkProps } from "next/dist/client/link";
  import type {
    AnchorHTMLAttributes,
    DetailedReactHTMLElement,
    MouseEventHandler,
    PropsWithChildren,
  } from "react";
  export * from "next/dist/client/link";

  type StaticRoute = Exclude<Route, { query: any }>["pathname"];

  export interface LinkProps
    extends Omit<NextLinkProps, "href" | "locale">,
      AnchorHTMLAttributes<HTMLAnchorElement> {
    href: Route | StaticRoute | Omit<Route, "pathname">
    locale?: false;
  }

  type LinkReactElement = DetailedReactHTMLElement<
    {
      onMouseEnter?: MouseEventHandler<Element> | undefined;
      onClick: MouseEventHandler;
      href?: string | undefined;
      ref?: any;
    },
    HTMLElement
  >;

  declare function Link(props: PropsWithChildren<LinkProps>): LinkReactElement;

  export default Link;
}

// prettier-ignore
declare module "next/router" {
  import type { Locale, Route, RoutedQuery } from "nextjs-routes";
  import type { NextRouter as Router } from "next/dist/client/router";
  export * from "next/dist/client/router";
  export { default } from "next/dist/client/router";

  type NextTransitionOptions = NonNullable<Parameters<Router["push"]>[2]>;
  type StaticRoute = Exclude<Route, { query: any }>["pathname"];

  interface TransitionOptions extends Omit<NextTransitionOptions, "locale"> {
    locale?: false;
  }

  export type NextRouter<P extends Route["pathname"] = Route["pathname"]> =
    Extract<Route, { pathname: P }> &
      Omit<
        Router,
        | "push"
        | "replace"
        | "locale"
        | "locales"
        | "defaultLocale"
        | "domainLocales"
      > & {
        defaultLocale?: undefined;
        domainLocales?: undefined;
        locale?: Locale;
        locales?: undefined;
        push(
          url: Route | StaticRoute | Omit<Route, "pathname">,
          as?: string,
          options?: TransitionOptions
        ): Promise<boolean>;
        replace(
          url: Route | StaticRoute | Omit<Route, "pathname">,
          as?: string,
          options?: TransitionOptions
        ): Promise<boolean>;
        route: P;
      };

  export function useRouter<P extends Route["pathname"]>(): NextRouter<P>;
}
