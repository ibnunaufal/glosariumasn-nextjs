import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export default function ContributionCard({id}) {
    return (
        <Card className="bg-white w-full max-w-sm mx-auto my-4 shadow-lg">
        <CardHeader className="text-center text-lg font-semibold">
            <CardTitle>Kontribusi</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
            {
                id ? 
                <div>Ingin berkontribusi menambahkan informasi lainnya dari kosakata <b>{id}</b>?</div> :
                <div>Ingin berkontribusi menambahkan informasi lainnya?</div>
            }
            
            <Button className="mt-4">
                Berkontribusi
            </Button>
        </CardContent>
        </Card>
    );
}