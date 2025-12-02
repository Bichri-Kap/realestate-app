import React from "react";

const CATEGORIES = [
    { name: "Houses", icon: "🏠" },
    { name: "Apartments", icon: "🏢" },
    { name: "Townhouses", icon: "🏘️" },
    { name: "Vacant Land", icon: "🌿" },
    { name: "Farms", icon: "🚜" },
];

export default function CategoriesSection() {
    return (
        <section className="py-16 bg-muted/50">
            <div className="container">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">Browse by Category</h2>
                    <p className="text-muted-foreground">Find the perfect property type for your needs</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                    {CATEGORIES.map((cat) => (
                        <div
                            key={cat.name}
                            className="flex flex-col items-center p-4 bg-white rounded-lg shadow hover:shadow-lg transition cursor-pointer"
                        >
                            <div className="text-4xl mb-2">{cat.icon}</div>
                            <span className="text-sm font-medium">{cat.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
