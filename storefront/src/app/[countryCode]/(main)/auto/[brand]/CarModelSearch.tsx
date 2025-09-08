"use client"
import React, { useState } from "react"
import Link from "next/link"

export default function CarModelSearch({ carmodels }: { carmodels: any[] }) {
  const [query, setQuery] = useState("")

  const filtered = carmodels.filter((model) =>
    model.name.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div>
      <div className="max-w-3xl mx-auto">
        <input
          type="text"
          placeholder="Search Car Models..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="mb-8 w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 transition"
        />
      </div>
      <ul className="flex flex-col items-center gap-6">
        {filtered.map((post) => (
          <li key={post.name} className="w-full flex justify-center">
            <Link href={`/car/${post.name}`} legacyBehavior>
              <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row w-full max-w-3xl hover:bg-gray-100 transition-colors duration-150 cursor-pointer">
                {post.image ? (
                  <img className="object-cover w-full rounded-t-lg h-64 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg bg-green-50" src={post.image} alt={post.name} />
                ) : (
                <span className="flex items-center justify-center w-48 h-full bg-gray-100 text-gray-500 text-lg font-semibold rounded-t-lg md:rounded-none md:rounded-s-lg">
                    No Image Found
                </span>
                )}
                <div className="flex flex-col justify-between p-4 leading-normal w-full">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{post.name}</h5>
                  <div
                    className="mb-3 font-normal text-gray-700 prose prose-sm prose-table:rounded-lg prose-table:border prose-table:border-gray-200 prose-th:bg-gray-50 prose-th:font-semibold prose-td:p-2"
                    dangerouslySetInnerHTML={{
                      __html: post.description || "Discover more about this model."
                    }}
                  />
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
