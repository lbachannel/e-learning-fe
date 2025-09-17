import VerifyComponent from "@/components/auth/VerifyComponent";

const VerifyPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    return (
        <VerifyComponent id={id} />
    )
}

export default VerifyPage;