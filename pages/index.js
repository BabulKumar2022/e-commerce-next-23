import Layout from "@/components/Layout";
import ProductItem from "@/components/ProductItem";
import Product from "@/models/Product";
// import data from "@/utils/data";
import db from "@/utils/db";




export default function Home({product}) {
  return (
    <Layout title="Home Page">
     
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {
        product.map((product) => (
           <ProductItem product ={product} key={product.slug}></ProductItem>
          ))
        }
      </div>
    </Layout>
  )
}


export async function getServerSideProps({product}){
  await db.connect();
    product = await Product.find().lean();
  return {
    props: {
      product: product.map(db.convertDocToOnj),
    },
  };
}
