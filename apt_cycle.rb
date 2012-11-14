def abs(number)
	if number < 0
		-number
	else
		number
	end
end

def distance(a,b)
	Math.sqrt( ( b[1] - a[1] )**2 + (b[0] - a[0])**2 )
end

def get_start(current_location, graph_object)
	d = 1.0/0
  n = nil
  for node in graph_object
    d_temp = distance(current_location, node[1..node.length]) 
    if d_temp < d
      d = d_temp
      n = node
    end
  end
  return n
end

def graph(lol)
	#lol is list of lists like  [['a',1,3],['b',2,2],['c',-2,1],['d',1,-2]]
	lol
end

def apt_cycle(start, graph)
	all_nodes = graph.permutation.to_a
	cycle = nil
	d = 1.0/0
	all_nodes.each do |perm|
		if perm[0] == start
			d_temp = 0
			perm.each_cons(2) do |node, next_node|
				l = node.length
				d_temp += distance(node[1..l], next_node[1..l])
			end
			if d_temp < d
				d = d_temp
				cycle = perm
			end
		end
	end
	return cycle
end
