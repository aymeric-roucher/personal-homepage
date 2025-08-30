import { useEffect, useRef } from 'react';

interface PlotlyChartProps {
  src: string;
  className?: string;
}

const PlotlyChart = ({ src, className = "w-full my-6" }: PlotlyChartProps) => {
  const plotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadChart = async () => {
      try {
        // Dynamically import Plotly to avoid SSR issues
        const Plotly = await import('plotly.js-dist-min');
        
        // Fetch the JSON data
        const response = await fetch(src);
        const plotData = await response.json();
        
        if (plotRef.current) {
          // Create the plot
          await Plotly.newPlot(plotRef.current, plotData.data, plotData.layout, {
            responsive: true,
            displayModeBar: false
          });
        }
      } catch (error) {
        console.error('Error loading Plotly chart:', error);
        if (plotRef.current) {
          plotRef.current.innerHTML = `
            <div style="padding: 40px; text-align: center; border: 2px dashed #dee2e6; border-radius: 8px; background: #f8f9fa;">
              <p style="margin: 0; color: #6c757d; font-style: italic;">
                Error loading chart from: ${src}
                <br/>
                <small>Please check that the file exists and is properly formatted</small>
              </p>
            </div>
          `;
        }
      }
    };

    loadChart();
  }, [src]);

  return <div ref={plotRef} className={className} />;
};

export default PlotlyChart;