import { searchProducts } from "@/actions/search-products";
import type { Product } from "@/lib/payload-types";
import { SearchProducts } from "../_components/search-products";
import { queryParamToNumber, queryParamToString } from "@/lib/utils";

type PageProps = {
  searchParams: Promise<{
    query: string | string[] | undefined;
    page: string | string[] | undefined;
    limit: string | string[] | undefined;
  }>;
};

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const query = queryParamToString(params.query);
  const queryPage = queryParamToNumber(params.page);
  const queryLimit = queryParamToNumber(params.limit);

  const data = await searchProducts(queryPage, query, queryLimit);
  let checkData: Product[] = [];
  let limit = 0;
  let page = 0;
  let total = 0;
  if (!data || !data.docs) {
    checkData = [];
  } else {
    checkData = data.docs;
    limit = data.limit;
    page = data.page;
    total = data.totalDocs;
  }

  return <SearchProducts products={checkData} limit={limit} offset={page} total={total} />;
}
