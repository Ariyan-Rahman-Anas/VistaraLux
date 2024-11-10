import usePageTitle from "../../customHooks/usePageTitle"
import WishlistTable from "./WishlistTable"

const WishlistPage = () => {
  usePageTitle("Wishlist")
  return (
      <div className="w- md:w-[75%] mx-auto pt-10 pb-4 space-y-16 ">
          <WishlistTable />
    </div>
  )
}

export default WishlistPage