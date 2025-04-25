import { searchProducts } from "@/actions/search-products";
import type { Product } from "@/lib/payload-types";
import { SearchProducts } from "../_components/search-products";
import { queryParamToNumber, queryParamToString } from "@/lib/utils";

export default async function Page(params: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const result = await params.searchParams;
  const query = queryParamToString(result.query);
  const queryPage = queryParamToNumber(result.page);
  const queryLimit = queryParamToNumber(result.limit);

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
