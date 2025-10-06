"use client"
import React, { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation";

export default function CarModelSearch({ carmodels }: { carmodels: any[] }) {
  const params = useParams<{ brand: string; model: string }>()
  const [query, setQuery] = useState("")

  const filtered = carmodels.filter((model) =>
    model.name.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div>
      <ul className="grid grid-cols-3 items-center gap-6">
        {filtered.map((post) => (
          <li key={post.name} className="w-full justify-center">
            <Link href={`/auto/${params.brand}/${string_to_slug(post.name)}`}>
              <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row w-full max-w-3xl hover:bg-gray-100 transition-colors duration-150 cursor-pointer">
                {post.image ? (
                  <img className="object-cover w-full rounded-t-lg h-64 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg bg-green-50" src={post.image} alt={post.name} />
                ) : (
                <span className="flex items-center justify-center w-48 h-full bg-gray-100 text-gray-500 text-lg font-semibold rounded-t-lg md:rounded-none md:rounded-s-lg">
                    No Image Found
                </span>
                )}
                <p>{post.name}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function string_to_slug (str) {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();
  
    // remove accents, swap ñ for n, etc
    var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
    var to   = "aaaaeeeeiiiioooouuuunc------";
    for (var i=0, l=from.length ; i<l ; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
        .replace(/\s+/g, '-') // collapse whitespace and replace by -
        .replace(/-+/g, '-'); // collapse dashes

    return str;
}