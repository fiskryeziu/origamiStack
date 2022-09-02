import React from 'react'
import { Button, Pagination } from 'react-daisyui'
import { useNavigate } from 'react-router-dom'

const PaginationC = ({ pages, page, isAdmin = false, value }) => {
  const navigate = useNavigate()
  return (
    pages > 1 && (
      <div className="m-10">
        <Pagination>
          {[...Array(pages).keys()].map((x) => (
            <Button
              active={x + 1 === page}
              key={x + 1}
              type="button"
              size="sm"
              onClick={() =>
                navigate(
                  !isAdmin
                    ? value
                      ? `/products/page/${x + 1}/${value}`
                      : `/products/page/${x + 1}`
                    : `/admin/products/${x + 1}`
                )
              }
            >
              {x + 1}
            </Button>
          ))}
        </Pagination>
      </div>
    )
  )
}

export default PaginationC
