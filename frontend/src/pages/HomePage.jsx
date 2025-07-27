import React from 'react'

const HomePage = () => {
  return (
    <div>
      <h1>hello</h1>
    </div>
  )
}

export default HomePage





















// import { create } from 'zustand'

// const useStore = create((set) => ({
//   count: 0,

//   // ✅ Action function to update state
//   increase: () =>
//     set((state) => ({
//       count: state.count + 1
//     })),

//   // ✅ Another action
//   reset: () =>
//     set({ count: 0 })
// }))



// so basicalyy in store we are using variable and function like reducer and we canuse this later ,  in reducer , we have slice to store function and store to store data , but in zustand it does things in one place