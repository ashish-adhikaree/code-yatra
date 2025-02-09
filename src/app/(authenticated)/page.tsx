import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"


export default function Home() {
    
    return (
        <section>
            <div className="container mx-auto">
                <div className="flex flex-col">

                    {/* Header Bar */}
                    <div className = "flex flex-row justify-between items-center">

                        <div className="flex flex-col justify-start items-start gap-4">
                            <h4 className="text-5xl font-semibold">Welcome Back,User</h4>
                            <h6 className="text-white/50">Here are the list of the upcoming events</h6>
                        </div>
                        {/* Notification Icon */}
                        <div className="">
                            Notification Icon

                        </div>
                    </div>

                    {/* Cards */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Card Title</CardTitle>
                            <CardDescription>Card Description</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>Card Content</p>
                        </CardContent>
                        <CardFooter>
                            <p>Card Footer</p>
                        </CardFooter>
                    </Card>



                </div>

            </div>
        </section>
    );
}
