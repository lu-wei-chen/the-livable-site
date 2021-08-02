import Link from "next/link";


const ParentCategoryBlock = ( props ) => {

    const { category } = props; 

    return (
        <div className="col-lg-3 col-md=6 col-sm-12">
            <h1 className="card-header text-center">{ category.name }</h1>
            <Link href={`/category?slug=${category.slug}-${category.id}`} > 
                <a>
                    <img src={ null !== category.image ? category.image.sourceUrl : '' } alt="" ></img>
                </a>
            </Link>

        </div>
    )
};

export default ParentCategoryBlock;

