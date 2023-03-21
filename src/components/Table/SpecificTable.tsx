import { ITopHeader, IHeader } from '../../interfaces/SpecificTable'
import { formatCustomDecimal } from 'dd360-utils'

interface SpecificTableProps {
  topHeader: ITopHeader[]
  header: IHeader[]
  data: any[]
}

function TableSpecific({ topHeader, header, data }: SpecificTableProps) {
  return (
    <div className="border border-gray-400 rounded-lg overflow-auto">
      <table className="w-full bg-white">
        <thead>
          <tr
            className="divide-x divide-gray-400 h-12 border-b border-b-gray-400 text-sm font-bold text-left text-gray-600"
            style={{ background: '#F9FCFF' }}
          >
            {topHeader.map((item, index) => (
              <th colSpan={item.colSpan} key={index}>
                {item.children}
              </th>
            ))}
          </tr>
          <tr
            className="divide-x divide-gray-400 h-8 border-b border-b-gray-400 text-xs font-semibold text-left"
            style={{ background: '#F9FAFB', color: '#8F969A' }}
          >
            {header.map(({ title, className }, index) => (
              <th key={index}>
                <div className={className}>{title}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={index}
              className="divide-x divide-gray-400 border-b border-b-gray-400 h-8 text-xs text-left text-gray-500"
            >
              {header.map(({ key, withCurrencyFormat }, idx) => (
                <th key={idx}>
                  <div className={`pl-${idx === 0 ? '6' : '4'}`}>
                    {withCurrencyFormat
                      ? formatCustomDecimal(item[key])
                      : item[key]}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TableSpecific
