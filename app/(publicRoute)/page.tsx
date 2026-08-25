
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import MotionCar from "@/components/page/home/MotionCar"
export default function Home() {
  return (
    <div >
      <Card className="border-none bg-transparent py-8 shadow-none px-30 rounded-none">
        <CardContent className="flex items-center justify-between p-0 ">
          <div className="w-2/5">
            <h1 className="mb-2 text-6xl font-bold text-foreground">
              Explore the Finest <span className="text-red-500">Global</span>{" "}
              Offers
            </h1>
            <h4 className="my-4 text-xl text-muted-foreground">
              Find your ideal ride for any adventure with our diverse range of
              affordable and dependable car rentals.
            </h4>
            <div className="mt-6 flex gap-4">
              <div className="space-x-4">
                <Button >Book Now</Button>
                <Button   >Learn More</Button>
              </div>
            </div>
          </div>

          <div className="flex w-3/5 justify-end">
            <MotionCar/>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}