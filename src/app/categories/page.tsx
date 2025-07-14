import { getCategoryTree, CategoryNode } from '@/lib/categoryTree';

function renderNode(node: CategoryNode) {
  return (
    <li key={node.path} className="mb-2">
      <span className="font-semibold">{node.name}</span>
      {node.files.length > 0 && (
        <ul className="pl-4 list-disc">
          {node.files.map(file => (
            <li key={file}>{file}</li>
          ))}
        </ul>
      )}
      {node.children.length > 0 && (
        <ul className="pl-4 border-l mt-1">
          {node.children.map(child => renderNode(child))}
        </ul>
      )}
    </li>
  );
}

export default function CategoriesPage() {
  const tree = getCategoryTree();
  return (
    <div className="prose">
      <h1>Categories</h1>
      <ul className="pl-0">{renderNode(tree)}</ul>
    </div>
  );
}
