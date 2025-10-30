import array
import random
from typing import List, Set, Dict



entryee = ["EE16A", "EE16B"]
signals = ["EE120", "EE121", "EE123"]
robotics = ["EEC106A", "EEC106B"]
power = ["EE108", "EE113", "EE137A", "EE137B"]
circuits = ["EE105", "EE140", "EE142"]

entrycs = ["CS61A", "CS61B"]
hardware = ["CS61C", "CS152"]
software = ["CS160", "CS168", "CS162"]

# Example course mapping (expand as needed)
# Each course: { 'prereqs': [...], 'next': [...] }
COURSE_MAP = {
    'CS61A': {'prereqs': [], 'next': ['CS61B', 'CS61C']},
    'CS61B': {'prereqs': ['CS61A'], 'next': ['CS61C', 'CS170', 'CS162']},
    'CS61C': {'prereqs': ['CS61A', 'CS61B'], 'next': ['CS152']},
    'CS152': {'prereqs': ['CS61C'], 'next': []},
    'CS162': {'prereqs': ['CS61B'], 'next': []},
    'CS170': {'prereqs': ['CS61B'], 'next': []},
    'EE16A': {'prereqs': [], 'next': ['EE16B']},
    'EE16B': {'prereqs': ['EE16A'], 'next': ['EE105', 'EE120', 'EE130']},
    'EE105': {'prereqs': ['EE16A', 'EE16B'], 'next': ['EE140', 'EE142']},
    'EE120': {'prereqs': ['EE16A', 'EE16B'], 'next': ['EE121', 'EE123']},
    'EE130': {'prereqs': ['EE16A', 'EE16B'], 'next': []},
    'EE140': {'prereqs': ['EE105'], 'next': []},
    'EE142': {'prereqs': ['EE105'], 'next': []},
    'EE121': {'prereqs': ['EE120'], 'next': []},
    'EE123': {'prereqs': ['EE120'], 'next': []},
    # Add more courses as needed
}

def recommend_courses(completed):
    """
    Given a list of completed courses, recommend next courses to take.
    Only uses basic Python constructs suitable for CS61A students.
    """
    completed_set = set()
    for c in completed:
        completed_set.add(c.upper().replace(' ', ''))
    recommendations = set()
    for course in COURSE_MAP:
        if course not in completed_set:
            prereqs = set()
            for p in COURSE_MAP[course]['prereqs']:
                prereqs.add(p.upper().replace(' ', ''))
            if prereqs.issubset(completed_set):
                recommendations.add(course)
    return sorted(list(recommendations))


def visualize_recommendation(completed):
    """
    Visualizes the recommendation process step by step.
    """
    print("\n--- Visualizing Recommendation Process ---")
    print("Completed courses:", completed)
    completed_set = set()
    for c in completed:
        completed_set.add(c.upper().replace(' ', ''))
    print("Processed completed set:", completed_set)
    for course in COURSE_MAP:
        if course not in completed_set:
            prereqs = set()
            for p in COURSE_MAP[course]['prereqs']:
                prereqs.add(p.upper().replace(' ', ''))
            print(f"Checking {course}: prereqs {prereqs}")
            if prereqs.issubset(completed_set):
                print(f"  -> {course} can be recommended!")
            else:
                print(f"  -> {course} cannot be recommended (missing prereqs)")
    print("--- End Visualization ---\n")

if __name__ == "__main__":
    # Hardcoded single test case example
    datatest = ["CS61A"]
    print("===== Hardcoded Test Case Example =====")
    print("Input (completed):", datatest)
    output = recommend_courses(datatest)
    print("Output (recommended):", output)
    print("===== End Hardcoded Test Case =====\n")

    # Test cases for recommend_courses
    test_cases = [
        [],
        ["CS61A"],
        ["CS61A", "CS61B"],
        ["CS61A", "CS61B", "CS61C"],
        ["EE16A"],
        ["EE16A", "EE16B"],
        ["EE16A", "EE16B", "EE105"],
        ["EE16A", "EE16B", "EE120"],
        ["EE16A", "EE16B", "EE120", "EE121"],
        ["CS61A", "CS61B", "CS61C", "CS152", "CS162", "CS170"],
    ]
    """print("===== Course Recommendation Test Cases =====")
    for i, completed in enumerate(test_cases):
        print(f"Test Case {i+1}:")
        print("  Completed:", completed)
        recs = recommend_courses(completed)
        print("  Recommended:", recs)
        print()
    print("===== End of Test Cases =====\n")
    """

    # Visualization for a few cases
   
    #visualize_recommendation(["EE16A", "EE16B"])
    #visualize_recommendation(["CS61A", "CS61B", "CS61C"])











            



     
    


    




        


    
                

        
