require 'pry'

def find_next(instructions)
  steps = instructions.flat_map { |i| i[:step] }.uniq.sort
  reqs = instructions.flat_map { |i| i[:req] }.uniq.sort
  next_instruction = reqs - steps
  next_instruction[0]
end

def find_required_path(instructions)
  final = ""
  loop do
    next_instr = find_next(instructions)
    final += next_instr
    if instructions.length == 1
      final += instructions[0][:step]
      break
    end
    instructions = instructions.delete_if {|i| i[:req] == next_instr}.sort_by {|i| i[:step]}
  end

  final
end

def get_code(c)
  c.upcase.ord - 'A'.ord + 1
end

def find_required_time(instructions, final_path, worker_count)
  assembled_path = ''
  time_passed = 0
  workers = []
  (0...worker_count).each do
    workers << { time_left: -1, working_on: '' }
  end

  # one worker starts on first one
  next_instruction = find_next(instructions)
  time_required = get_code(next_instruction) # + 60
  workers[0][:working_on] = next_instruction
  workers[0][:time_left] = time_required
  #instructions = instructions.delete_if { |i| i[:req] == next_instruction}.sort_by {|i| i[:step] }

  loop do
    time_passed = time_passed + 1
    workers.each do |worker|
      worker[:time_left] = worker[:time_left] - 1

      if worker[:time_left] <= 0
        assembled_path += worker[:working_on] if worker[:time_left].zero?
        
        next_instruction = find_next(instructions)
        deps = instructions.select {|i| i[:req] == next_instruction}
        puts assembled_path
        puts deps.inspect
        binding.pry
        unless assembled_path.include? deps.first[:req]
          time_required = get_code(next_instruction) # + 60
          worker[:working_on] = next_instruction
          worker[:time_left] = time_required
          print next_instruction
        else
          print "."
        end
      else
        print worker[:working_on]
      end
    end
    print "\n"

    break if assembled_path == final_path
  end
  time_passed
end

# data = File.readlines('src/inputs/7')
data = "Step C must be finished before step A can begin.
Step C must be finished before step F can begin.
Step A must be finished before step B can begin.
Step A must be finished before step D can begin.
Step B must be finished before step E can begin.
Step D must be finished before step E can begin.
Step F must be finished before step E can begin.".split "\n"

instr = data.map { |line| {step: line.strip.split(' ')[7], req: line.strip.split(' ')[1] } }
instr_copy = instr.clone
shortest_path = find_required_path(instr)

puts "part 1: #{shortest_path}"
puts "part 2: #{find_required_time(instr_copy, shortest_path, 2)}"
