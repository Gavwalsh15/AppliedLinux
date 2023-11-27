date
echo "CPU Usage: $(top -bn1 | grep Cpu | awk '{print $2}')%" 
echo "Memory Usage: $(free -m | awk '/Mem/ {printf "%dMB used, %dMB free, %dMB total", $3, $4, $2}')"

