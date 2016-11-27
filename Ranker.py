from sys import version_info

#Part 1: Building the Customized List

py3 = version_info[0] > 2
if py3:
  input_function = input
else:
  input_function  = raw_input

item_list = []
keep_going = True
while keep_going:
  element = input_function('Give me an item, until you type stop: ')
  if element == 'stop':
    keep_going = False
  else:
    item_list.append(element)
print(item_list)
comparisons = 0

#Part 2: Shell Sort

def shellSort(alist):
    gap = len(alist)//2
    while gap > 0:

      for startposition in range(gap):
        gapInsertionSort(alist,startposition,gap)

      gap = gap // 2 #onto next gap size

    print('Your final list is: ', alist)
    print('With %s elements and %s comparisons' % (len(alist), comparisons))

def gapInsertionSort(alist,start,gap):
    for i in range(start+gap,len(alist),gap): #when start+gap hits end, goes to next number in range(gap)

        currentValue = alist[i] #one on right, b
        position = i #the element you're on right now
        comparedValue = alist[position-gap] #one on left, a
        #print('next i value is ', i, comparedValue, currentValue) #test

        while position>=gap: #while there are still valid elements to the left, #and alist[position-gap]>currentValue: #if left bigger than right, go into while loop
          prefer = input_function('Which do you prefer: a)%s or b)%s?' % (comparedValue, currentValue))
          global comparisons
          if prefer == 'a': #keep a on left
            comparisons += 1
            #print(alist)
            break
          elif prefer == 'b': #move b to the left, a to right
            alist[position]=alist[position-gap] #change right (b) into left (a)
            position = position-gap #if switches, position changes to left one
            alist[position]=currentValue #if switched, changes left to right. If not, keeps right the same
            comparedValue = alist[position-gap]
            currentValue = alist[position]
            comparisons += 1
            #print(alist)
          else:
            print('Please enter either a or b')
            
# Part 3: Calling the ShellSort

alist = item_list
class_list = []
shellSort(alist)
#for gui, itkinter.py? 

"""Documentation
Part 1: Building the Customized List
takes in user input. The user will type one line per item, then type stop to complete the list. The list will not include the word 'stop'.
Part 2: This is the actual sorting mechanism. The shellSort function takes in the user input list, 
"""
