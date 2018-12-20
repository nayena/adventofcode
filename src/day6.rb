require 'pry'
require 'set'

def manhattan_distance(p1, p2)
  ((p1[0] - p2[0]).abs + (p1[1] - p2[1]).abs)
end

def find_closest(points, x, y)
  distances = []
  points.each_with_index do |pt, idx|
    distances << [manhattan_distance([x, y], pt), idx]
  end
  distances.sort!

  return -1 if distances[0][0] == distances[1][0] # same distance counts to no one
  distances[0][1]
end

def find_infinite_indexes(grid, max_x, max_y)
  infinite_indexes = Set.new
  grid.each_pair do |pt, idx|
    if pt[0] == 0 || pt[1] == 0 || pt[0] == max_x || pt[1] == max_y
      infinite_indexes << idx
    end
  end
  infinite_indexes
end

def largest_non_infinite_region(points)
  max_x = points.max_by { |p| p[0] }

  max_y = points.max_by { |p| p[1] }

  grid = {}
  pt_idx_counts = {}

  (0..max_x[0]).each do |x|
    (0..max_y[1]).each do |y|
      pt_idx = find_closest(points, x, y)
      grid[[x, y]] = pt_idx
      pt_idx_counts[pt_idx] ||= 0
      pt_idx_counts[pt_idx] += 1
    end
  end

  find_infinite_indexes(grid, max_x[0], max_y[1]).each do |inf_idx|
    pt_idx_counts.delete(inf_idx)
  end

  pt_idx_counts.max_by { |_idx, count| count }[1]
end

def largest_region_with_closest_distances(points, max_distance)
  max_x = points.max_by { |p| p[0] }
  max_y = points.max_by { |p| p[1] }

  grid_of_distance_sums = {}
  (0..max_x[0]).each do |x|
    (0..max_y[1]).each do |y|
      d_sums = points.sum(0) { |pt| manhattan_distance(pt, [x, y]) }
      grid_of_distance_sums[[x, y]] = d_sums
    end
  end
  grid_of_distance_sums.select { |_pt, distance| distance < max_distance }.length
end

points = File.readlines('src/inputs/6').map { |line| line.strip.split(', ').map(&:to_i) }
puts largest_non_infinite_region(points)

puts largest_region_with_closest_distances(points, 10_000)
