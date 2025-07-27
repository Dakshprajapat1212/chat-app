import React from 'react'
;
import { User, Eye, MessageSquare } from 'lucide-react';
const SettingsPage = () => {
  return (
   <div className="flex gap-6 text-blue-600 text-3xl p-10">
    <User />
    <Eye />
    <MessageSquare />
  </div>
  )
}

export default SettingsPage
