export const getProducts = async () => {
    const response = await fetch("https://pretalab-api-439254010866.us-central1.run.app/products");
    const data = await response.json();

    return data;
}