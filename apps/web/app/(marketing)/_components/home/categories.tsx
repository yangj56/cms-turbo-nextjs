import type { CategoryDocumentDefinition } from '@/data/types';

type Props = {
  data: CategoryDocumentDefinition[];
};
export const LightingCategories = ({ data }: Props) => {
  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-4xl font-bold">Categories</h2>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {data.map(category => (
            <div key={category.name} className="text-center">
              <img
                src={category.image}
                alt={category.name}
                className="mx-auto mb-4 h-auto w-full"
              />
              <h3 className="text-xl font-semibold">{category.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
